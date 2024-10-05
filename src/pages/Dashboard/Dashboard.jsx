import styles from './Dashboard.module.css'
import { Link } from 'react-router-dom'

// hooks
import { useAuthValue } from '../../context/AuthContext'
import { useFetchDocuments } from '../../hooks/useFechtDocuments'
import { useDeleteDocument } from '../../hooks/useDeleteDocument'

const Dashboard = () => {
  const {user} = useAuthValue();
  const uid = user.uid;

  const {documents: posts, loading} = useFetchDocuments('posts', null, uid);

  const { deleteDocument } = useDeleteDocument('posts');

  return (
    <div className={styles.dashboard}>
      <h2>Dashboard</h2>
      <p>Gerencie os seus posts</p>
      {loading && <p>Carregando...</p>}
      {posts && posts.length === 0 && !loading && (
        <div className={styles.noposts}>
          <p>Não foram encontrados posts</p>
          <Link to='/posts/create' className='btn'>Criar primeiro posts</Link>
        </div>
      )}
      {posts && posts.length > 0 && (
        <>
          <div className={styles.post_header}>
            <span>Titulo</span>
            <span>Ações</span>
          </div>
          {posts.map((post) => 
            <div key={post.id} className={styles.post_row}>
              <p>{post.title}</p>
              <div>
                <Link to={`/posts/${post.id}`}  className='btn btn-outline'>
                Ver
                </Link>
                <Link to={`/posts/edit/${post.id}`}  className='btn btn-outline'>
                Editar</Link>
                <button onClick={() => deleteDocument(post.id)} className='btn btn-outline btn-danger'>
                  Excluir
                </button>
              </div>
            </div>
          )}
       </>
        
      )}      
    </div>
  )
}

export default Dashboard