function TabButton({ children, isSelected, ...props }) {
    return (
      <li>
        <button className={isSelected ? "active" : undefined} {...props}>
          {/* Here also remaining props are passed through rest operator, i.e, props forwarding */}
          {children}
        </button>
      </li>
    );
    // Here, the children property refers to any content that is present in between opening and closing tags of our custom component.
  }
  
  export default TabButton;
  