
export const generateUniqueId = (product) => {
    return `${product.company}_${product.category}_${product.name}_${Date.now()}`;
  };
  
  export const getRandomImage = () => {
    const randomId = Math.floor(Math.random() * 1000);
    return `https://picsum.photos/200/300?random=${randomId}`;
  };