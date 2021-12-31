import { graphql } from "gatsby"
import Img from "gatsby-image"
import React from "react"
import MazziVideo from "../../content/blog/animation/ion-mazzi-animation.mp4"
import MirrorVideo from "../../content/blog/animation/look-in-the-mirror-intro-demo.mp4"
import RealityMakersVideo from "../../content/blog/animation/reality-makers-poster-animation.mp4"
import TypographyVideo from "../../content/blog/animation/typography-poster-4.mp4"
import Layout from "../components/layout"
import SEO from "../components/seo"

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title={post.frontmatter.title} />
        <article
          className={`post-content ${post.frontmatter.thumbnail || `no-image`}`}
        >
          <header className="post-content-header">
            <h1 className="post-content-title">{post.frontmatter.title}</h1>
          </header>

          {post.frontmatter.description && (
            <p class="post-content-excerpt">{post.frontmatter.description}</p>
          )}

          {post.frontmatter.thumbnail &&
            post.frontmatter.title !== "Animation" && (
              <div className="post-content-image">
                <Img
                  className="kg-image"
                  fluid={post.frontmatter.thumbnail.childImageSharp.fluid}
                  alt={post.frontmatter.title}
                />
              </div>
            )}

          {post.frontmatter.title === "Animation" && (
            <div>
              <video controls style={{ width: `100%`, marginBottom: `40px` }}>
                <source src={TypographyVideo} type="video/mp4" />
              </video>
              <video controls style={{ width: `100%`, marginBottom: `40px` }}>
                <source src={RealityMakersVideo} type="video/mp4" />
              </video>
              <video controls style={{ width: `100%`, marginBottom: `40px` }}>
                <source src={MirrorVideo} type="video/mp4" />
              </video>
              <video controls style={{ width: `100%`, marginBottom: `40px` }}>
                <source src={MazziVideo} type="video/mp4" />
              </video>
            </div>
          )}

          <div
            className="post-content-body"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          <footer className="post-content-footer">
            {/* There are two options for how we display the byline/author-info.
        If the post has more than one author, we load a specific template
        from includes/byline-multiple.hbs, otherwise, we just use the
        default byline. */}
          </footer>
        </article>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
