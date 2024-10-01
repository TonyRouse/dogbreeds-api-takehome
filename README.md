# Dog Breeds Take Home Test

## Running the App
### Backend
1. Ensure that you are in the root directory of the project
2. Set Up A virtual environment `python -m venv venv`
3. Activate the virtual environment `source venv/bin/activate`
2. Run `pip install -r backend/requirements.txt`
3. Run `python backend/app.py` to start the backend server
4. The backend server should now be running on `http://localhost:5000`

Here you can test the API by sending a GET request using curl:
```
curl "http://127.0.0.1:5000/api/fetchBreeds?page=3"
```

Clear the cache using:
```
curl -X POST "http://127.0.0.1:5000/api/clearCache"
```

### Frontend
1. Ensure that you are in the root directory of the project
2. Run `npm install` to install the required dependencies
3. Run `npm run dev` to start the frontend server

## Notes:
1. This will cache, assuming that this is a public API and the data is not updated frequently. (10 minute cache)
2. It also assumes the data will not be different per user or session
3. It uses a default image if the image is not available or the URL is broken
4. The frontend is very basic and only displays the data in a list with Prev/Next buttons

## Improvements:
1. NEEDS TESTING
2. I haven't fully tested if you were to start on page 8, then go to page 3, then go back to page 8, if it would fetch the data again or use the cache
3. There seems to be duplicated on different pages, but seem like it comes from the external API, it is not dedupping or anything.
4. The backend assumes if it gets an error, the page will always return that error, in the real world we would want to retry, etc.