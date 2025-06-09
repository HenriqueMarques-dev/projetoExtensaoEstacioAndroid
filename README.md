# 📊 gestorX

**gestorX** é um aplicativo mobile simples e funcional para controle de vendas, desenvolvido como trabalho de extensão acadêmica. Ele permite ao usuário registrar produtos vendidos, preços, quantidades e acompanhar suas vendas de forma organizada. Tudo isso com persistência local de dados usando SQLite.

---

## 🚀 Funcionalidades

- 🔐 Login com persistência de sessão
- 🛍️ Cadastro de vendas (produto, preço, quantidade)
- 📄 Listagem de vendas organizadas com total por item
- 📦 Banco de dados local com SQLite
- 📱 Interface amigável e responsiva

---

## 🛠️ Tecnologias Utilizadas

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [expo-router](https://expo.github.io/router/)
- [expo-sqlite](https://docs.expo.dev/versions/latest/sdk/sqlite/)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)
- [expo-haptics](https://docs.expo.dev/versions/latest/sdk/haptics/)

---

## 🖼️ Screenshots

| Tela de Login | Cadastro de Venda |
|:-------------:|:------------------:|
| ![Login](./assets/print1.png) | ![Cadastro](./assets/print2.png) |

| Lista de Vendas | Feedback de Sucesso |
|:---------------:|:-------------------:|
| ![Lista](./assets/print3.png) | ![Sucesso](./assets/print4.png) |

> 📂 Coloque as imagens dos prints na pasta `assets/` com os nomes `print1.png`, `print2.png`, etc.

---

## 📦 Como Executar

```bash
git clone https://github.com/seu-usuario/gestorx
cd gestorx
npm install
npx expo start
