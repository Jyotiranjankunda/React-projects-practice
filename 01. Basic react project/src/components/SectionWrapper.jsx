// Here, ...restProps is the rest operator, that means, except children and title props, all rest other props are grouped into the restProps object, like here id or class or anything, and that restProps can be used as the attributes of section tag.

function SectionWrapper({ children, title, ...restProps }) {
    return (
      <section {...restProps}>
        <h2>{title}</h2>
        {children}
      </section>
    );
  }
  
  export default SectionWrapper;
  