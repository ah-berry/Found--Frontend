
const localURL = "http://localhost:8000/api";

export default class ViewSetAPI {

    private endpoint: string;

	constructor(endpoint: string) { 
		this.endpoint = '/' + endpoint
	}

    private getEndpointURL(method: string, id: string) {
        let url = localURL + this.endpoint;
        if (id != "") {
            url = localURL + this.endpoint + '/' + id + '/';
        }
        if (method == 'POST') {
            url += '/'
        }
        return url 
    }

    public async get(id: string) {
        let url = this.getEndpointURL('GET', id);
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        };
        try {
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            };
            const data = await fetch(url, options)
                .then(response => {
                    console.log(response);
                    if (!response.ok) {
                        throw new Error('Network response was not okay in GET request.')
                    }
                    console.log(response.ok)
                    return response.json();
                })
                .catch(error => {
                    console.log('Error fetching in GET request: ', error);
                    return;
                })
            return data;
        } catch {
            return undefined;
        }
    }

    public async genericRequest(method: string, id: string, body: {}) {
        let url = this.getEndpointURL(method, id);
        try {
            const options = {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            }
            const data = await fetch(url, options)
              .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not okay in ${method} request`)
                }
                return response.json();
              })
              .catch (error => {
                console.log(`Error performing ${method} request: `, error);
                return;
              })
              return data;
        } catch {
            return undefined;
        }
    }

    public async nonStandardRequestIndividual(methodType: string, custom_method: string, id: string, body: {}) {
        // This function is for non-standard HTTP requests for target individual objects associated with an id.
        let url = localURL + this.endpoint + '/' + id + '/' + custom_method + '/';
        try {
            var options = {
                method: methodType,
                headers: {
                    'Content-Type': 'application/json',
                }
            }
            // Avoids adding a "body" option for GET requests.
            if (methodType !== 'GET') {
                Object.assign(options, {body: JSON.stringify(body)})
            }
            const data = await fetch(url, options)
              .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not okay in ${methodType} request`)
                }
                return response.json();
              })
              .catch (error => {
                console.log(`Error performing ${methodType} request: `, error);
                return;
              })
              return data;
        } catch {
            return undefined;
        }
    }

    public async nonStandardRequestAggregate(methodType: string, custom_method: string, body?: {}) {
        // This function is for non-standard HTTP requests for all target objects.
        let url = localURL + this.endpoint + '/' +  custom_method + '/';
        try {
            var options = {
                method: methodType,
                headers: {
                    'Content-Type': 'application/json',
                }
            }
            // Avoids adding a "body" option for GET requests.
            if (methodType !== 'GET') {
                Object.assign(options, {body: JSON.stringify(body)})
            }
            const data = await fetch(url, options)
              .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not okay in ${methodType} request`)
                }
                return response.json();
              })
              .catch (error => {
                console.log(`Error performing ${methodType} request: `, error);
                return;
              })
              return data;
        } catch {
            return undefined;
        }
    }

    public async post(body: {}) {
        if (Object.keys(body).length == 0) {
            throw new Error ('No body as part of POST request')
        }
        return this.genericRequest('POST', "", body);
    }

    public async update(id: string, body: {}) {
        return this.genericRequest('PATCH', id, body);
    }

    public async delete(id: string) {
        return this.genericRequest('DELETE', id, {});
    }

}