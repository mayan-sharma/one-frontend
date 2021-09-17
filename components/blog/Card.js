import Link from 'next/link';
import renderHTML from 'react-render-html'

import { API } from '../../config';

const Card = ({ blog }) => {

    const showCategories = blog => (
        blog.Categories.map(category => (
            <Link key={category.id} href={`/categories/${category.slug}`}>
                <a className='btn btn-primary mr-2 ml-1'>{category.name}</a>
            </Link>
        ))
    )

    const showTags = blog => (
        blog.Tags.map(tag => (
            <Link key={tag.id} href={`/tags/${tag.slug}`}>
                <a className='btn btn-outline-primary mr-2 ml-1'>{tag.name}</a>
            </Link>
        ))
    )

    return (
        <div className='lead pb-4'>
            <header>
                <Link href={`blogs/${blog.slug}`}>
                    <a>
                        <h2 className='pt-3 pb-3 font-weight-bold'>{blog.title}</h2>
                    </a>
                </Link>
            </header>
            <section>
                <p className='blockquote-footer ml-1'>
                    Written By {blog.User.name} | Published
                </p>
            </section>
            <section>
                {showCategories(blog)}
                {showTags(blog)}
            </section>
            <div className='row mt-3'>
                <div className='col-md-4'>
                    <section>
                        <img 
                            className='img img-fluid' 
                            style={{height: '100%', width: '100%'}} 
                            src={`${API}/blogs/photo/${blog.slug}`}
                            alt={`${blog.title} image`}
                        />
                    </section>
                </div>
                <div className='col-md-8'>
                    <section>
                        <div className='pb-3'>
                            {renderHTML(blog.excerpt)}
                        </div>
                        <Link href={`/blogs/${blog.slug}`}>
                            <a className='btn btn-primary pt-2'>Read More</a>
                        </Link>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default Card;