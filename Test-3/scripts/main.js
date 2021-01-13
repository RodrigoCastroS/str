


class PhotoGallery {
    constructor(){
        this.API_KEY = '563492ad6f917000010000014a1a73daa4894ecea6745fd916b414d9';
        this.itemsGrid = document.querySelector(".items-grid");
        this.itemsSubGrid = document.querySelector(".sub-grid")
        this.eventHandle();
    }

    eventHandle(){
        document.addEventListener('DOMContentLoaded', ()=> {
            this.getImg();          
        });
    }

    async getImg(){
        const baseUrl = "https://api.pexels.com/v1/search?query=";
        const data = await this.fetchImages(baseUrl +"fashion&per_page=5");
        const data_2 = await this.fetchImages(baseUrl + "clothes&per_page=4");
        this.generateGrid(data.photos)
        this.generateSubGrid(data_2.photos)
    }

    async fetchImages(baseUrl){
        const response = await fetch(baseUrl,{
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: this.API_KEY
            }
        });
        const data = await response.json();
        return data;

    }

    generateGrid(photos){
       
        photos.forEach(photo => {
            const div = document.createElement('div');
            
            div.classList.add('item');
            div.innerHTML = `
                <h3>${photo.photographer}</h3>
                <img loading="lazy" class="image" src="${photo.src.large}" alt="photo">
            `;

            this.itemsGrid.insertBefore(div, this.itemsSubGrid)

            
        });
    }

    generateSubGrid(photos){
        photos.forEach(photo => {
            const div = document.createElement('div');

            div.classList.add('sub-item');
            div.innerHTML = `
                <h3>${photo.photographer}</h3>
                <img loading="lazy" class="image" src="${photo.src.large}" alt="photo">
            `;

            this.itemsSubGrid.appendChild(div)
            
        });
    }
}

const photos = new PhotoGallery;