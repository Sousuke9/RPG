//LOADERS. currently only used to load images.

class AssetLoader{
    constructor(){
        this.assets = {};
        this.loadedAssets = 0;
        this.totalAssets = 0;
    }
    async loader(object){this.totalAssets++;

        const promises = Object.entries(object).map(([key, value]) => {//image loader for now
            return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = value;
            img.onload = ()=>{
                this.assets[key] = img;
                this.loadedAssets++; 
                resolve();
            }
            img.onerror = ()=>{
                console.error(`Failed to load asset: ${value} \n Please refresh your browser and try again. If this issue persists, please contact the dev.`);
                this.totalAssets--; //decrease totalAssets on error so tht the loading percentage doesnt stays low forever
                reject();
            }
    });
});
await Promise.all(promises);
return this.assets;
}
}

