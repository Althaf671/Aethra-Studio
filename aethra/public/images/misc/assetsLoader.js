const images = import.meta.glob('/src/assets/**/*.{png,jpg,jpeg,svg,webp}', { eager: true });

const getImage = (path) => {
    return images[`/src/assets/${path}`]?.default || '';
};

export default getImage;