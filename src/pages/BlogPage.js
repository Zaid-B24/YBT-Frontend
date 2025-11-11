import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight, Search, Tag } from "lucide-react";
import { Link } from "react-router-dom";

const PageWrapper = styled.div`
  padding-top: 100px;
  min-height: 100vh;
  background: black;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeroSection = styled.section`
  padding: 4rem 2rem;
  text-align: center;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
`;

const HeroTitle = styled.h1`
  font-family: "Playfair Display", serif;
  font-size: 4rem;
  font-weight: 400;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  color: #ccc;
  max-width: 600px;
  margin: 0 auto 2rem;
`;

const FilterSection = styled.div`
  padding: 2rem;
  background: rgba(255, 255, 255, 0.02);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const FilterContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

const SearchBox = styled.div`
  position: relative;
  flex: 1;
  min-width: 250px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.8rem 1rem 0.8rem 2.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  border-radius: 4px;

  &::placeholder {
    color: #666;
  }

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.4);
  }
`;

const SearchIcon = styled(Search)`
  position: absolute;
  left: 0.8rem;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  color: #666;
`;

const CategoryTabs = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const CategoryTab = styled.button`
  padding: 0.8rem 1.5rem;
  background: ${(props) =>
    props.active ? "rgba(255,255,255,0.1)" : "transparent"};
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  font-size: 0.9rem;
  letter-spacing: 1px;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const BlogGrid = styled.div`
  padding: 4rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const BlogCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(255, 255, 255, 0.2);
  }
`;

const BlogImage = styled.div`
  height: 250px;
  background: ${(props) =>
      props.image
        ? `url(${props.image})`
        : "linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)"}
    center center/cover no-repeat;
  position: relative;
`;

const BlogCategory = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: uppercase;
`;

const BlogContent = styled.div`
  padding: 2rem;
`;

const BlogTitle = styled.h3`
  font-family: "Playfair Display", serif;
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 1rem;
  line-height: 1.3;
`;

const BlogExcerpt = styled.p`
  color: #ccc;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
`;

const BlogMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  font-size: 0.8rem;
  color: #666;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ReadMoreButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #fff;
  font-size: 0.9rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    gap: 1rem;
  }
`;

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const blogPosts = [
    {
      id: 1,
      title: "The Future of Luxury Automotive Customization",
      excerpt:
        "Explore how cutting-edge technology and innovative design are reshaping the world of high-end vehicle modifications.",
      image:
        "https://www.mansory.com/sites/default/files/styles/teaser_large/public/2024-03/future-blog.jpg",
      category: "Industry",
      author: "John Martinez",
      date: "March 15, 2024",
      readTime: "5 min read",
    },
    {
      id: 2,
      title: "Behind the Scenes: BMW M5 Transformation",
      excerpt:
        "Take an exclusive look at the complete transformation process of our latest BMW M5 project from concept to completion.",
      image:
        "https://www.mansory.com/sites/default/files/styles/teaser_large/public/2024-02/bmw-blog.jpg",
      category: "Projects",
      author: "Sarah Chen",
      date: "February 28, 2024",
      readTime: "8 min read",
    },
    {
      id: 3,
      title: "Carbon Fiber: The Material of Choice",
      excerpt:
        "Discover why carbon fiber has become the gold standard for luxury automotive modifications and performance upgrades.",
      image:
        "https://www.mansory.com/sites/default/files/styles/teaser_large/public/2024-01/carbon-blog.jpg",
      category: "Technology",
      author: "Mike Rodriguez",
      date: "January 20, 2024",
      readTime: "6 min read",
    },
    {
      id: 4,
      title: "Electric Vehicle Customization Trends",
      excerpt:
        "How the rise of electric vehicles is creating new opportunities and challenges in the customization industry.",
      image:
        "https://www.mansory.com/sites/default/files/styles/teaser_large/public/2024-01/ev-blog.jpg",
      category: "Industry",
      author: "Lisa Thompson",
      date: "January 10, 2024",
      readTime: "7 min read",
    },
    {
      id: 5,
      title: "Client Spotlight: Lamborghini Huracán Build",
      excerpt:
        "Meet the client behind our stunning Lamborghini Huracán transformation and learn about their vision.",
      image:
        "https://www.mansory.com/sites/default/files/styles/teaser_large/public/2024-02/lambo-blog.jpg",
      category: "Client Stories",
      author: "David Kim",
      date: "February 15, 2024",
      readTime: "4 min read",
    },
    {
      id: 6,
      title: "The Art of Interior Customization",
      excerpt:
        "Explore the intricate world of luxury interior modifications and the craftsmanship that goes into each detail.",
      image:
        "https://www.mansory.com/sites/default/files/styles/teaser_large/public/2024-01/interior-blog.jpg",
      category: "Craftsmanship",
      author: "Emma Wilson",
      date: "December 22, 2023",
      readTime: "9 min read",
    },
  ];

  const categories = [
    { key: "all", label: "All Posts" },
    { key: "Industry", label: "Industry" },
    { key: "Projects", label: "Projects" },
    { key: "Technology", label: "Technology" },
    { key: "Client Stories", label: "Client Stories" },
    { key: "Craftsmanship", label: "Craftsmanship" },
  ];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeCategory === "all" || post.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <PageWrapper>
      <p style={{ fontSize: "1.5rem", color: "#666" }}>
        Oops we are cooking something! We'll get back soon 😉
      </p>
      {/* <HeroSection>
        <HeroTitle>Blog</HeroTitle>
        <HeroSubtitle>
          Stay updated with the latest insights, projects, and innovations 
          from the world of luxury automotive customization.
        </HeroSubtitle>
      </HeroSection>

      <FilterSection>
        <FilterContainer>
          <SearchBox>
            <SearchIcon />
            <SearchInput
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchBox>
          
          <CategoryTabs>
            {categories.map(category => (
              <CategoryTab
                key={category.key}
                active={activeCategory === category.key}
                onClick={() => setActiveCategory(category.key)}
              >
                {category.label}
              </CategoryTab>
            ))}
          </CategoryTabs>
        </FilterContainer>
      </FilterSection>

      <BlogGrid>
        <GridContainer>
          {filteredPosts.map((post, index) => (
            <BlogCard
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <BlogImage image={post.image}>
                <BlogCategory>{post.category}</BlogCategory>
              </BlogImage>
              <BlogContent>
                <BlogTitle>{post.title}</BlogTitle>
                <BlogExcerpt>{post.excerpt}</BlogExcerpt>
                <BlogMeta>
                  <MetaItem>
                    <User size={14} />
                    <span>{post.author}</span>
                  </MetaItem>
                  <MetaItem>
                    <Calendar size={14} />
                    <span>{post.date}</span>
                  </MetaItem>
                  <MetaItem>
                    <Tag size={14} />
                    <span>{post.readTime}</span>
                  </MetaItem>
                </BlogMeta>
                <ReadMoreButton to={`/blog/${post.id}`}>
                  Read More
                  <ArrowRight size={16} />
                </ReadMoreButton>
              </BlogContent>
            </BlogCard>
          ))}
        </GridContainer>
      </BlogGrid> */}
    </PageWrapper>
  );
};

export default BlogPage;
