export default async function graphqlRequest(query) {
    const url = 'https://rakcer.id/gql'
    const headers = { 'Content-Type': 'application/json' }

    const res = await fetch(url, {
        headers,
        method: 'POST',
        body: JSON.stringify(query)
    })

    if (!res.ok) {
        throw new Error('failed to fetch data')
    }

    const resJson = await res.json()
    return resJson
}