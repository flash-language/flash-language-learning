export function transformObjectToArray(obj) {
    return Object.keys(obj).map(key => {
        return {
            id: key,
            ...obj[key]
        };
    });
}

export function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
} 