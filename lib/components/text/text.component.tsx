import React from "react";

const Styles = {
  default: {
    fontSize: "16px",
    fontWeight: 400,
  },
  h1Light: {
    fontSize: "2.5rem",
    fontWeight: 300,
  },
  h1Heavy: {
    fontSize: "2.5rem",
    fontWeight: 700,
  },
  h2Light: {
    fontSize: "2rem",
    fontWeight: 300,
  },
  h2Heavy: {
    fontSize: "2rem",
    fontWeight: 700,
  },
  h3Light: {
    fontSize: "1.75rem",
    fontWeight: 300,
  },
  h3Heavy: {
    fontSize: "1.75rem",
    fontWeight: 700,
  },
  paragraphLight100: {
    fontSize: "0.875rem",
    fontWeight: 300,
  },
  paragraphHeavy100: {
    fontSize: "0.875rem",
    fontWeight: 700,
  },
  paragraphLight200: {
    fontSize: "1rem",
    fontWeight: 300,
  },
  paragraphHeavy200: {
    fontSize: "1rem",
    fontWeight: 700,
  },
  paragraphLight300: {
    fontSize: "1.25rem",
    fontWeight: 300,
  },
  paragraphHeavy300: {
    fontSize: "1.25rem",
    fontWeight: 700,
  },
  paragraphLight400: {
    fontSize: "1.5rem",
    fontWeight: 300,
  },
  paragraphHeavy400: {
    fontSize: "1.5rem",
    fontWeight: 700,
  },
  button100: {
    fontSize: "0.875rem",
    fontWeight: 400,
  },
  button200: {
    fontSize: "1rem",
    fontWeight: 400,
  },
  label100: {
    fontSize: "0.875rem",
    fontWeight: 400,
  },
  label200: {
    fontSize: "1rem",
    fontWeight: 400,
  },
  label300: {
    fontSize: "1.25rem",
    fontWeight: 400,
  },
  label400: {
    fontSize: "1.5rem",
    fontWeight: 400,
  },
};

type TextProps = {
  variant: keyof typeof Styles;
  component: React.ElementType;
  color?: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
} & React.HTMLAttributes<HTMLElement>;

class Text extends React.Component<TextProps> {
  static defaultProps = {
    variant: "default",
    component: "span",
  };

  render() {
    const { variant, component, color, children, className, style, ...props } =
      this.props;
    const Component = component;

    return (
      <Component
        className={className}
        style={{
          fontFamily: "Inter, sans-serif, system-ui",
          ...Styles[variant],
          color,
          ...style,
        }}
        {...props}
      >
        {children}
      </Component>
    );
  }
}

export { Text };
