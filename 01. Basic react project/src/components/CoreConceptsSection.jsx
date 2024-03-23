import CoreConcept from "./CoreConcept.jsx";
import { CORE_CONCEPTS } from "../data.jsx";

export default function CoreConceptsSection() {
  return (
    <section id="core-concepts">
      <h2>Core Concepts</h2>
      <ul>
        {/* <CoreConcept
                image={CORE_CONCEPTS[0].image}
                title={CORE_CONCEPTS[0].title}
                description={CORE_CONCEPTS[0].description}
            />

            // When the props name and the keys of object are same, then we can simply use object destructuring as below, rather than the first one 

            <CoreConcept {...CORE_CONCEPTS[1]} />
            <CoreConcept {...CORE_CONCEPTS[2]} />
            <CoreConcept {...CORE_CONCEPTS[3]} /> 
        */}

        {/* In the above method, we are manually typing the no. of components, which can lead to problems, if more objects are added in the CORE_CONCEPTS array or any one is removed. */}

        {/* The curly brackets {} can render any valid js expression, even it can output any array or jsx syntax also. Since, the CORE_CONCEPTS array consists of objects, that contain the image title and description. Now, react is not able to know that the image property in the object should be displayed by an image tag, and so on. So, we have to transform that array of objects into an array of jsx, so that we can output it. To do that, we use the map method on the CORE_CONCEPTS array, to convert every object into the jsx component. This results in dynamic output, i.e, for any no. of objects, it outputs correctly rather than manually typing.*/}

        {CORE_CONCEPTS.map((conceptItem) => (
          <CoreConcept key={conceptItem.title} {...conceptItem} />
        ))}
      </ul>
    </section>
  );
}
