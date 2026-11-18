import { Repo, User } from "./types"

export function cleanQuery({query}:{query:string}){
    const cleanedQuery = query.trim()
    return cleanedQuery
}

export function getRepoUrl({query}:{query:string}) {
    const cleanedQuery = cleanQuery({query})
    const updatedQuery = `https://api.github.com/users/${encodeURIComponent(cleanedQuery)}/repos?per_page=100&sort=updated`

    return updatedQuery
}

export function getUserUrl({query}:{query:string}) {
    const cleanedQuery = cleanQuery({query})
    const updatedQuery = `https://api.github.com/users/${encodeURIComponent(cleanedQuery)}`

    return updatedQuery
}


export async function fetchAllRepos({reposUrl}:{reposUrl: string}): Promise<Repo[]> {

    const all: Repo[] = []
    
    for(let page = 1; page <= 10; page++){
        const response = await fetch(`${reposUrl}?per_page=100&page=${page}&sort=updated`)
        if(!response.ok) break

        const repos: Repo[] = await response.json()
        all.push(...repos)

        if(repos.length < 100) break
        
    }

    return all
}

// export async function fetchUser({userUrl}:{userUrl: string}): Promise<User | null> {

//     const response = await fetch(userUrl)
//     if(!response.ok) return null

//     return await response.json()
// }

