let ErrorPage = {
  render: async () => {
    let view = `
            <section class="section">
                <h1> 404 Error </h1>
            </section>
        `;
    return view;
  },
  after_render: async () => {},
};
export default ErrorPage;
