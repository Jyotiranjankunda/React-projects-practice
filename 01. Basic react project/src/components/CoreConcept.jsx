function CoreConcept(props) {
    return (
      <li>
        <img src={props.image} alt={props.title} />
        <h3>{props.title}</h3>
        <p>{props.description}</p>
      </li>
    );
  }
  // In the above component, instead of writing props, we can use destructuring also
  /* 
      function CoreConcept({image, title, description}){
        // And here, rather than writing {props.image}, we can directly write {image}
      }
    */
  
  export default CoreConcept;