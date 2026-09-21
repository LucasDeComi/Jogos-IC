export default function Icon({ src, color = "currentColor", size = 24, className }) {
  return (
    <span
        className={className}
        style={{
            width: size,
            height: size,
            display: "inline-block",
            backgroundColor: color,
            maskImage: `url("${src}")`,
            WebkitMaskImage: `url("${src}")`,
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            maskPosition: "center",
            WebkitMaskPosition: "center",
            maskSize: "contain",
            WebkitMaskSize: "contain",
        }}
    />
  )
}
