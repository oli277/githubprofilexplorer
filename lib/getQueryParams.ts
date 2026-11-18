export function cleanQuery({query}:{query:string}){
    const cleanedQuery = query.trim()
    return cleanedQuery
}

export function getRepoUrl({query}:{query:string}) {
    const cleanedQuery = cleanQuery({query})
    const updatedQuery = `https://api.github.com/users/${encodeURIComponent(cleanedQuery)}/repos`

    return updatedQuery
}

export function getUserUrl({query}:{query:string}) {
    const cleanedQuery = cleanQuery({query})
    const updatedQuery = `https://api.github.com/users/${encodeURIComponent(cleanedQuery)}`

    return updatedQuery
}