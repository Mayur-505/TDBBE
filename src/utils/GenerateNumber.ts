export const generateNumber = async () => {
    const randomNumber = Math.floor(100000000 + Math.random() * 900000000);
    return `glspl_${randomNumber}`;
}