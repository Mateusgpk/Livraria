import request from './api';
 
const editoraService = {
    cadastrarEditora: (editoraData) => request({
        endpoint: '/api/editoras',
        method: 'POST',
        data: editoraData
    }),
};
export default editoraService;