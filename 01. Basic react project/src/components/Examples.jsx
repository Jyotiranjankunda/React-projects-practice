import TabButton from "./TabButton";
import { useState } from "react";
import { EXAMPLES } from "../data.jsx";
import SectionWrapper from "./SectionWrapper";
import Tabs from "./Tabs";

function Examples() {
  const [selectedTopic, setSelectedTopic] = useState();

  function handleSelect(selectedButton) {
    setSelectedTopic(selectedButton);
    // console.log(selectedTopic);

    // This console log statement is logging the previous state value, even after it is written after updating the state. It is because, when setSelectedTopic is called, then react re-executes this component, and the selectedTopic value is available after the whole component is re-rendered. And, so it is logging the previous state value.
  }

  let tabContent = <p>Please select a topic</p>;

  if (selectedTopic) {
    tabContent = (
      <div id="tab-content">
        <h3>{EXAMPLES[selectedTopic].title}</h3>
        <p>{EXAMPLES[selectedTopic].description}</p>
        <pre>
          <code>{EXAMPLES[selectedTopic].code}</code>
        </pre>
      </div>
    );

    // In JavaScript, when you want to access a property of an object using a variable to represent the property name, you should not enclose the variable in quotes. Instead, you should use the variable directly inside the square brackets `[]`.

    // So, in your code, when you write `EXAMPLES[selectedTopic].title`, you are accessing the property of the `EXAMPLES` object using the value stored in the `selectedTopic` variable as the key. This is the correct way to access the property dynamically based on the value of `selectedTopic`.

    // If you were to write `EXAMPLES['selectedTopic'].title`, it would try to access a property named `'selectedTopic'` in the `EXAMPLES` object, which is not what you want. You want to access the property whose key matches the value stored in the `selectedTopic` variable. Hence, you should use `EXAMPLES[selectedTopic].title`.
  }

  return (
    // We can create a section wrapper class, which will contain the following structure, i.e, a section tag, inside that a heading and then content.

    // The problem is that here we have used id attribute, but if we create a Section custom component, and pass id as a prop, then that attribute will not be automatically applied to the section tag of our component, we have to manually apply it. And not only id, there can be many such attributes. So to forward such attributes, we use props forwarding using rest operator

    <SectionWrapper title="Examples" id="examples">
      {/* We are passing a pointer to this handleSelect function or we can say that we are passing the function as a value to the onSelect prop and in the TabButton component, we are forwarding that to the onClick prop, so that on the click of the button, the handleSelect function will be fired. */}

      {/* Since, we are passing the function as a value, we must not add parenthesis after the func name, because that will call the function immediately as the component will be rendered, but we need the function to be called on button click. */}

      {/* 
          Like this: 

          <TabButton onSelect={handleSelect}>Components</TabButton>
          <TabButton onSelect={handleSelect}>JSX</TabButton>
          <TabButton onSelect={handleSelect}>Props</TabButton>
          <TabButton onSelect={handleSelect}>State</TabButton>
      */}

      {/* 
      we now want to replace dynamic content with some different content depending on which button was clicked here. And for that, we'll need to know which button was clicked.
            
      So therefore, int the handleSelect function we want to accept a parameter, selectedButton maybe. And selectedButton should be a string that's either "components" if the components button was clicked, "JSX" if the JSX button was clicked, and so on.
            
      These could be our four identifiers. So depending on which button was clicked, selectedButton should be one of these four values.
            
      And we can do this by, instead of pointing at this handle select function here, i.e., instead of using that as a value for onSelect we can pass an arrow function to onSelect.

      () => handleSelect("components")
            
      It will now make sure that this anonymous arrow function is now actually the value that's passed as a value to onSelect, and therefore in the end also to onClick. And hence, we can now write code inside of this arrow function body. So on the right side of this arrow that will be executed when this anonymous function will be executed.
            
      And therefore, here, we can now execute handleSelect, because this code will now not run immediately when this line of code gets parsed. And this arrow function is then passed as a value to the tap button on this onSelect prop. And therefore, when this function is executed because the button was clicked, it's then that this code inside of the arrow function will get executed. And therefore, now here we can execute handleSelect manually and we can control how it will be executed.
      */}

      {/* 
      Here, we can make the Tab component more flexible by setting the buttonsContainer prop, i.e, we can define it as a prop, that in which element the buttons are to be wrapped.
      
      For built in elements, like div, ul, menu, etc. they are passed as a string in the prop, and any built in component is passed as {Section} like this.

      One more thing is that, we have to pass this prop as its first letter capital, is small is passed, then that is set to any variable, that starts with capital letter.

      either buttonsContainer = "menu" or ButtonsContainer = "menu", both are correct, but if small one is used, then it can be stored in any variable named with caital letter in the Tabs component.
      */}

      <Tabs
        buttonsContainer="menu" 
        buttons={
          <>
            <TabButton
              onClick={() => handleSelect("components")}
              isSelected={selectedTopic === "components"}
            >
              Components
            </TabButton>
            <TabButton
              onClick={() => handleSelect("jsx")}
              isSelected={selectedTopic === "jsx"}
            >
              JSX
            </TabButton>
            <TabButton
              onClick={() => handleSelect("props")}
              isSelected={selectedTopic === "props"}
            >
              Props
            </TabButton>
            <TabButton
              onClick={() => handleSelect("state")}
              isSelected={selectedTopic === "state"}
            >
              State
            </TabButton>
          </>
        }
      >
        {tabContent}
      </Tabs>

      {/* Here, we have passed the menu content, i.e, the JSX as a prop to the Tabs wrapper component, and inside the Tabs component, the tabContent will be shown. So, here are wo jsx slots, one is the menu buttons, and another is the tabContent, i.e, the children for Tabs component. Wherever we write JSX, we must wrap it inside one element, like here <> </>*/}

      {/* This pattern might look redundant here, but it is a crucial pattern to divide the code into multiple jsx slots. */}

      {/* Another method of using tabContent is by using ternary operator
          {selectedTopic ? (
            <div id="tab-content">
                <h3>{EXAMPLES[selectedTopic].title}</h3>
                <p>{EXAMPLES[selectedTopic].description}</p>
                <pre>
                  <code>{EXAMPLES[selectedTopic].code}</code>
                </pre>
              </div>
            ) : (
              <p>Please select a topic</p>
            )
          }
      */}
    </SectionWrapper>
  );
}

export default Examples;
