import { Breed } from '../types/Breed';
import { BreedResponse } from '../types/BreedResponse';

export const mockFetchDogs = async (page: number): Promise<BreedResponse> => {
    try {
        const response = await fetchDogsMock(page);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: (Breed | { error: string })[] = await response.json();

        // Filter out invalid records that do not have the required keys
        const validBreeds = data.filter((item): item is Breed => {
            return typeof item.breed === 'string' && (typeof item.image === 'string' || item.image === null);
        });

        return validBreeds;
    } catch (error) {
        return { error: error instanceof Error ? error.message : 'An unknown error occurred' };
    }
};

const fetchDogsMock = async (page: number) => {
    let data = [];
    if(page === 1){
        data = [{"breed":"Dutch Shepherd","image":null},{"breed":"English Setter","image":null},{"breed":"English Shepherd","image":"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/missedme.jpg"},{"breed":"English Springer Spaniel","image":null},{"breed":"English Toy Spaniel","image":null},{"breed":"English Toy Terrier","image":null},{"breed":"Eurasier","image":null}];
    } else if(page === 2){
        data = [{"breed":"Field Spaniel","image":null},{"breed":"Finnish Lapphund","image":null},{"breed":"Finnish Spitz","image":null},{"breed":"Flat-Coated Retriever","image":null},{"breed":"French Bulldog","image":null},{"breed":"French Spaniel","image":null},{"breed":"Galgo Español","image":null}];
    } else if(page === 3){
        data = [{"breed":"German Longhaired Pointer","image":null},{"breed":"German Pinscher", "image":null},{"breed":"German Shepherd Dog","image":null},{"breed":"German Shorthaired Pointer","image":null},{"breed":"German Spaniel","image":null},{"breed":"German Spitz","image":null},{"breed":"German Wirehaired Pointer","image":null}];
    } else if(page === 4){
        data = [{"breed":"Giant Schnauzer","image":null},{"breed":"Glen of Imaal Terrier","image":null},{"breed":"Golden Retriever","image":null},{"breed":"Gordon Setter","image":null},{"breed":"Gran Mastín de Borínquen","image":null},{"breed":"Grand Anglo-Français Blanc et Noir","image":null},{"breed":"Grand Anglo-Français Blanc et Orange","image":null}];
    } else if(page === 5){
        data = [{"breed":"Grand Anglo-Français Tricolore","image":null},{"breed":"Grand Griffon Vendéen","image":null},{"breed":"Great Dane","image":null},{"breed":"Great Pyrenees","image":null},{"breed":"Greater Swiss Mountain Dog","image":null},{"breed":"Greek Harehound","image":null},{"breed":"Greenland Dog","image":null}];
    } else {
        data = [{"error": 'too many pages'}];
    }

    return {
        ok: true,
        status: "OK",
        json: async () => {
            return data;
        }
    };
};