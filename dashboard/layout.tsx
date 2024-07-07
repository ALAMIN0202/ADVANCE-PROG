//import Session from "../components/session"
import Session from "../component/session"

export default function AboutLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <section>
   
   
        {children}
      </section>
    )
  }