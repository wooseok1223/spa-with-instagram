export function getBase64FormFile(file) {
    return new Promise((resolve, reject) => {
        const render = new FileReader()
        render.readAsDataURL(file)
        render.onload = () => resolve(render.result)
        render.onerror = error => reject(error)
    })
}