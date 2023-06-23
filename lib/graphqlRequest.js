export default async function graphqlRequest(query) {
    const url = 'https://rakcer.id/gql';
    const encodedQuery = encodeURIComponent(query);
    const requestUrl = `${url}?query=${encodedQuery}`;


    try {
        const response = await fetch(requestUrl);

        if (!response.ok) {
            throw new Error('Gagal mengirim permintaan GraphQL');
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Terjadi kesalahan saat mengirim permintaan GraphQL:', error);
        throw new Error('Terjadi kesalahan saat mengirim permintaan GraphQL');
    }
}