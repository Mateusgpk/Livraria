import request from './api';

const livroService = {
    cadastrarLivro: (livroData) => request({
        endpoint: '/api/livros',
        method: 'POST',
        data: livroData
    }),
};
export default livroService;