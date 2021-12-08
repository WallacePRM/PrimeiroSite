class FetchUtils {
    static async fetchHtml(path) {
        /* Path = 'caminho do arquivo HTML' */
        const response = await fetch(path);
        if (response.status !== 200) {
            throw new Error('Falha ao baixar página');
        }
        /* Retorna uma promessa contendo uma estrutura HTML */
        return response.text();
    };
}
