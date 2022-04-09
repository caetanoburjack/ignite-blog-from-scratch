import { GetStaticPaths, GetStaticProps } from 'next';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';
import Header from '../../components/Header';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps) {
  console.log(post)
  return (
    <>
      <Header />
      <img src="/banner.svg" alt="imagem" className={styles.banner} />
      <main className={commonStyles.container}>
        <div className={styles.post}>
          <div className={styles.postTop}>
            <h1>Titulo do post</h1>
            <ul>
              <li>
                <FiCalendar />
                07 de abril de 2022
              </li>
              <li>
                <FiUser />
                Caetano Burjack
              </li>
              <li>
                <FiClock />
                5 min
              </li>
            </ul>
          </div>

          <article>
            <h2>Titulo seção</h2>
            <p>
              texto falso texto falso texto falso texto falso
              texto falso texto falso texto falso texto falso
              texto falso texto falso texto falso texto falso
              texto falso texto falso texto falso texto falso
              texto falso
            </p>
          </article>

        </div>
      </main>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  // const prismic = getPrismicClient();
  // const posts = await prismic.query(TODO);

  return {
    paths: [],
    fallback: true,
  }
};

export const getStaticProps: GetStaticProps = async context => {
  const prismic = getPrismicClient()
  const { slug } = context.params
  const response = await prismic.getByUID('p', String(slug), {})

  const post = {
    uid: response.uid,
    first_publication_date: response.first_publication_date,
    data: {
      title: response.data.title,
      subtitle: response.data.subtitle,
      author: response.data.author,
      banner: {
        url: response.data.banner.url,
      },
      content: response.data.content.map(content => {
        return {
          heanding: content.heading,
          body: [...content.body],
        }
      })
    }
  }

  return {
    props: {
      post,
    }
  }
};
