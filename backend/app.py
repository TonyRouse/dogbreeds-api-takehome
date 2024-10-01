from flask import Flask, jsonify, request
from cachetools import TTLCache
import requests

app = Flask(__name__)

cache = TTLCache(maxsize=100, ttl=600)
pagination_cache = TTLCache(maxsize=100, ttl=600)

def fetch_breeds(page: int) -> list:
    if page in cache:
        return cache[page]

    try:
        response = requests.get(f"https://interview-wheat.vercel.app/api/dogs?page={page}")

        if response.status_code != 200:
            raise Exception(f"API returned status {response.status_code}")

        data = response.json()

        if "error" in data:
            raise Exception(f"API error: {data['error']}")

        valid_breeds = [breed for breed in data if 'breed' in breed and 'image' in breed]

        cache[page] = valid_breeds

        return valid_breeds

    except Exception as e:
        print(f"Error fetching page {page}: {e}")
        return fetch_breeds(page + 1)

def fetch_until_15_breeds(page: int) -> list:
    current_page = page
    previous_page = page - 1
    if previous_page in pagination_cache:
        index = pagination_cache[previous_page]['index']
        page = pagination_cache[previous_page]['page']
    else:
        index = 0

    breeds: list = []
    while len(breeds) < 15:
        next_page_breeds = fetch_breeds(page)

        for i, breed in enumerate(next_page_breeds):
            if len(breeds) >= 15:
                pagination_cache[current_page] = {'index': i, 'page': page}
                break
            if i < index:
                continue

            breeds.append(breed)

        if not next_page_breeds:
            break

        page += 1

    return breeds

@app.route('/api/fetchBreeds', methods=['GET'])
def fetch_breeds_api():
    page = int(request.args.get('page', 1))
    breeds = fetch_until_15_breeds(page)
    return jsonify(breeds)

@app.route('/api/clearCache', methods=['POST'])
def clear_cache():
    cache.clear()
    pagination_cache.clear()
    return jsonify({"message": "Cache cleared successfully"}), 200

if __name__ == '__main__':
    app.run(debug=True)