import Link from 'next/link';
import renderHTML from 'react-render-html';

import { API } from '../../config';

const MiniCard = ({ blog }) => {
    return (
        <div className='card'>
            <section>
                <Link href={`/blogs/${blog.slug}`}>
                    <a>
                        <img
                            className='img img-fluid'
                            style={{ height: '100%', width: '100%' }}
                            src={`${API}/blogs/photo/${blog.slug}`}
                            alt={`${blog.title} image`}
                        />
                    </a>
                </Link>
            </section>
            <div className='card-body'>
                <section>
                    <Link href={`/blogs/${blog.slug}`}>
                        <h5 className='card-title'>{blog.title}</h5>
                    </Link>
                    <p className='card-text'>{renderHTML(blog.excerpt ? blog.excerpt : '...')}</p>
                </section>
            </div>
            <div className='card-body'>
                <Link href={`/blogs/${blog.slug}`}>
                    <a>Read More</a>
                </Link>
            </div>
        </div>
    );
}

export default MiniCard;