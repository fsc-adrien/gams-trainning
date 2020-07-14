import axios from 'axios';

const token = "";
class AxiosService {
    constructor() {
        const instance = axios.create({
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        instance.interceptors.response.use(this.handleSuccess, this.handleError);
        this.instance = instance;
    }

    handleSuccess(response) {
        return response;
    }

    handleError(error) {
        return Promise.reject(error);
    }

    get(url) {
        return this.instance
            .get(url)
            .then(res => res.data);
    }

    post(url, body) {
        return this.instance
            .post(url, body)
            .then(res => res.data);
    }

    put(url, body) {
        return this.instance
            .put(url, body)
            .then(res => res.data);
    }

    putWithoutBody(url) {
        return this.instance
            .put(url)
            .then(res => res.data);
    }

    deleteWithBody(url, body) {
        return this.instance
            .delete(url, body)
            .then(res => res.data);
    }

    delete(url) {
        return this.instance
            .delete(url)
            .then(res => res.data);
    }
}

export default new AxiosService();