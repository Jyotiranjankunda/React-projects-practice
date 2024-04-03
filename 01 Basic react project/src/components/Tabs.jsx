function Tabs({ children, buttons, buttonsContainer }) {
    // Here, we have take the buttonsContainer prop as a small letter, so we have to assign it with any other variable having first letter capital, then to use it as a tag.

    // or another way is we can set the prop to ButtonsContainer = "menu" as a default prop value.

    const ButtonsContainer = buttonsContainer;
    return (
      <>
        <ButtonsContainer>{buttons}</ButtonsContainer>
        {children}
      </>
    );
  }
  
  export default Tabs;
  