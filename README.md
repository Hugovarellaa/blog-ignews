# Ignews 💛🚀

<p align="center">Feito com 💙 por Hugo Alves Varella</p>

&nbsp;

### 🔗 Link para o projeto online

[Ignews](https://blog-ignews-hugovarellaa.vercel.app/)

&nbsp;

![mock1](https://user-images.githubusercontent.com/71772559/113495090-3e529600-94c5-11eb-953c-53ab4f71fc15.png)

## 📚 Informações sobre o projeto

- Esse projeto foi desenvolvido durante um dos capitulos do Ignite da Rocketseat! A ideia era desenvolver do um blog pago onde o usuário loga usando o GitHub e paga sua inscrição usando o Stripe. Usuários que não possuem a inscrição, só conseguem ver alguns parágrafos iniciais do post, orefecendo a inscrição logo abaixo.

&nbsp;

## 💻 O que tem no projeto?

- Integração com o Prismic CMS, para trabalhar com toda a parte do sistema do blog.
- Integração com o Stripe para a parte dos pagamentos das inscrições.
- Integração com o NextAuth para a parte do login com o Github.
- Sistema de verificação de assinatura, o conteúdo exibido varia entre usuários com/sem assinatura paga.
- Dados são salvos no bando do FaunDb.
- Uso do sistema estático do Next.js, onde os posts são mantidos no cache para um melhor carregamento.

&nbsp;

![mock2](https://user-images.githubusercontent.com/71772559/113495232-84f4c000-94c6-11eb-81fe-4dfb37d29e44.png)

&nbsp;

## 🛠️ Tecnologias/Ferramentas ultilizadas

- [React](https://pt-br.reactjs.org/E)
- [Next.js](https://nextjs.org/)
- [NextAuth](https://next-auth.js.org/)
- [Prismic CMS](https://prismic.io/)
- [Stripe](https://stripe.com/en-br)
- [Fauna](https://fauna.com/)

&nbsp;

## 🔖 Layout

Você pode visualizar o layout do projeto através [desse link](https://www.figma.com/file/1ObvavGTVFuRrMWyYmYMtO/ig.news-Copy?fuid=975921817161406319). É necessário ter conta no [Figma](http://figma.com/) para acessá-lo.


&nbsp;

## ⚙️ Instalação

```
# Abra um terminal e copie este repositório com o comando
$ git clone https://github.com/Hugovarellaa/Blog-ignews
```

```
# Acesse a pasta da aplicação
$ cd Blog-ignews

# Crie um arquivo .env.local e coloque as variaveis
# de ambiente baseado no arquivo .env.example

# Instale as dependências
$ yarn

# Inicie a aplicação
$ yarn dev

```
