export function buildRouterPath(path){
    const routeParametersRegex = /:([a-zA-Z]+)/g
    //substituir todos os parametros por um outro regex
    const pathWithParamas = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)')

    const pathRegex = new RegExp(`^${pathWithParamas}(?<query>\\?(.*))?$`)
    //toda regez retorna um metodo test
    return pathRegex
}