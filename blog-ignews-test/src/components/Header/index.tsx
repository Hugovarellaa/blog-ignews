import { Container } from "./styles";

export function Header() {
  return (
    <Container>
      <div>
        <img src="/images/logo.svg" alt="Ig.news" />
        <nav>
          <a href="#" className="active">
            Home
          </a>
          <a href="#">Post</a>
        </nav>
        {/* Botao entra com github */}
      </div>
    </Container>
  );
}
