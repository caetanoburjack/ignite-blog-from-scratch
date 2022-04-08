import { GetStaticProps } from 'next';
import Link from 'next/link';
import Header from '../components/Header';
import { FiCalendar, FiUser } from 'react-icons/fi'
import { getPrismicClient } from '../services/prismic';
import Prismic from '@prismicio/client'

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ }: HomeProps) {
  return (
    <>
      <main className={commonStyles.container}>
        <Header />
        <div className={styles.posts}>
          <Link href='/'>
            <a className={styles.post}>
              <strong>Titulo do Post</strong>
              <p>Subtitulo do post</p>
              <ul>
                <li>
                  <FiCalendar />
                  07 de Abril de 2022
                </li>
                <li>
                  <FiUser />
                  Caetano
                </li>
              </ul>
            </a>
          </Link>
          <Link href='/'>
            <a className={styles.post}>
              <strong>Titulo do Post</strong>
              <p>Subtitulo do post</p>
              <ul>
                <li>
                  <FiCalendar />
                  07 de Abril de 2022
                </li>
                <li>
                  <FiUser />
                  Caetano
                </li>
              </ul>
            </a>
          </Link>
          <button type="button">
            Carregar mais posts
          </button>
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query(
    [
      Prismic.Predicates.at('document.type', 'p')
    ],
    {
      pageSize: 1 //para mostrar a paginação, pois o padrão parece q é 20 posts por vez.
    }
  );

  const posts = postsResponse.results.map(
    post => {
      return {
        uid: post.uid,
        first_publication_date: post.first_publication_date,
        data: {
          title: post.data.title,
          subtitle: post.data.subtitle,
          author: post.data.author
        }
      }
    }
  )

  // console.log(postsResponse.results);
  return {
    props: {
      postsResponse,
    }
  }
}
