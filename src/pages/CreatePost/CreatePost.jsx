import styles from './CreatePost.module.css'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext'
import { useInsertDocument } from '../../hooks/useInsertDocument'

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [body, setBody] = useState('');
    const [tags, setTags] = useState([]);
    const [formError, setFormError] = useState('');

    const {user} = useAuthValue();

    const {insertDocument, response} = useInsertDocument('posts');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormError('');
        
        // validar image url
        try {
            new URL(image);
        // eslint-disable-next-line no-unused-vars
        } catch (error) {
            return setFormError('A imagem precisa ser uma URL.');
        }

        // criar array de tags
        const tagsArray = tags.split(',').map((tag) => tag.trim().toLowerCase());

        // checar todos os valores
        if(!title || !image || !tags || !body){
            setFormError('Por fabor, preencha todos os campos!');
        }

        //if(formError) return;

        insertDocument({
            title,
            image,
            body,
            tagsArray,
            uid: user.uid,
            createdBy: user.displayName
        });

        // redirect to home page
        navigate('/');
    }

  return (
    <div className={styles.creatPost}>
        <h2>Criar post</h2>
        <p>Escreva sobre o que quiser e compartilhe o seu conhecimento!</p>
        <form onSubmit={handleSubmit}>
            <label>
                <span>Titulo:</span>
                <input 
                type="text" 
                name='title' 
                required 
                placeholder='Pense em um bom titulo...' 
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                />
            </label>
            <label>
                <span>URL da imagem:</span>
                <input 
                type="text" 
                name='image' 
                required 
                placeholder='Insira uma imagem para o seu post' 
                onChange={(e) => setImage(e.target.value)}
                value={image}
                />
            </label>
            <label>
                <span>Conteúdo:</span>
               <textarea 
                name="body" 
                required 
                placeholder='Insira o conteúdo do post ...'
                onChange={(e) => setBody(e.target.value)}
                value={body}
                ></textarea>
            </label>
            <label>
                <span>Tags:</span>
                <input 
                type="text" 
                name='tags' 
                required 
                placeholder='Insira as tags separadas por virgula' 
                onChange={(e) => setTags(e.target.value)}
                value={tags}
                />
            </label>
            {!response.loading && <button className="btn">Postar</button>}
            {response.loading && (
                <button className="btn" disabled>
                    Aguarde...
                </button>
            )}
            {response.error && <p className="error">{response.error}</p>}
            {formError && <p className="error">{formError}</p>}
        </form>
    </div>
  )
}

export default CreatePost