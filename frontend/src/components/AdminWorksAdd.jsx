import { useContext, useEffect, useState } from "react";
import axios from "axios";

import AccountBreadcrumb from "./AccountBreadcrumb";
import Admin403 from "./Admin403";

import CurrentUserContext from "../contexts/CurrentUser";

export default function AdminWorksAdd() {
  const { currentUser } = useContext(CurrentUserContext);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [techniques, setTechniques] = useState([]);
  const breadcrumb = [
    {
      id: 1,
      title: "Mon compte",
      link: "/account",
    },
    {
      id: 2,
      title: "Gérer les œuvres",
      link: "/account/works",
    },
    {
      id: 3,
      title: "Ajouter une œuvre",
      link: null,
    },
  ];

  useEffect(() => {
    const host = import.meta.env.VITE_BACKEND_URL;
    axios
      .get(`${host}/authors`)
      .then((response) => setAuthors(response.data))
      .catch((err) => console.error(err));
    axios
      .get(`${host}/categories`)
      .then((response) => setCategories(response.data))
      .catch((err) => console.error(err));
    axios
      .get(`${host}/techniques`)
      .then((response) => setTechniques(response.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {currentUser.isAdmin ? (
        <>
          <AccountBreadcrumb breadcrumb={breadcrumb} />
          <section className="account works">
            <h2>Ajouter une œuvre</h2>
            <p>Les champs accompagnés d’un * sont obligatoires</p>
            <form encType="multipart/form-data" noValidate>
              <fieldset>
                <legend>Intitulé</legend>
                <p>
                  <label htmlFor="add-title">
                    Titre complet
                    <span aria-label=" obligatoire"> *</span>
                  </label>
                  <input id="add-title" name="title" type="text" required />
                </p>
                <p>
                  <label htmlFor="add-title">Titre abrégé</label>
                  <input id="add-title" name="title" type="text" />
                </p>
                <p>
                  <label htmlFor="add-reference">
                    Référence
                    <span aria-label=" obligatoire"> *</span>
                  </label>
                  <input
                    id="add-reference"
                    name="reference"
                    type="text"
                    maxLength="255"
                    required
                  />
                </p>
              </fieldset>
              <fieldset>
                <legend>Image</legend>
                <p>
                  <label htmlFor="add-image">
                    Fichier à téléverser
                    <span aria-label=" obligatoire"> *</span>
                  </label>
                  <input
                    id="add-image"
                    name="image"
                    type="file"
                    accept="image/jpeg,image/png,image/svg+xml,image/tiff"
                    required
                  />
                </p>
                <p>
                  <label htmlFor="add-description">
                    Description
                    <span aria-label=" obligatoire"> *</span>
                  </label>
                  <input
                    id="add-description"
                    name="description"
                    type="text"
                    maxLength="255"
                    required
                  />
                </p>
              </fieldset>
              <fieldset>
                <legend>Caractéristiques</legend>
                {authors.length && (
                  <p>
                    <label htmlFor="add-author">
                      Auteur
                      <span aria-label=" obligatoire"> *</span>
                    </label>
                    <select id="add-author" name="author_id" required>
                      {authors.map((option) => {
                        const { id, firstname, lastname, artistname } = option;
                        const author = [firstname, lastname, artistname]
                          .filter((element) => element)
                          .join(" ");
                        return (
                          <option key={`author-${id}`} value={id}>
                            {author}
                          </option>
                        );
                      })}
                    </select>
                  </p>
                )}
                {categories.length && (
                  <p>
                    <label htmlFor="add-category">
                      Catégorie
                      <span aria-label=" obligatoire"> *</span>
                    </label>
                    <select id="add-category" name="category_id" required>
                      {categories.map((option) => {
                        const { id, category } = option;
                        return (
                          <option key={`category-${id}`} value={id}>
                            {category}
                          </option>
                        );
                      })}
                    </select>
                  </p>
                )}
                {techniques.length && (
                  <p>
                    <label htmlFor="add-technique">
                      Technique
                      <span aria-label=" obligatoire"> *</span>
                    </label>
                    <select id="add-technique" name="technique_id" required>
                      {techniques.map((option) => {
                        const { id, technique } = option;
                        return (
                          <option key={`technique-${id}`} value={id}>
                            {technique}
                          </option>
                        );
                      })}
                    </select>
                  </p>
                )}
                <p>
                  <label htmlFor="add-created">
                    Date de réalisation
                    <span aria-label=" obligatoire"> *</span>
                  </label>
                  <input
                    id="add-created"
                    name="created"
                    type="text"
                    maxLength="255"
                    required
                  />
                </p>
                <p>
                  <label htmlFor="add-location">
                    Lieu de conservation
                    <span aria-label=" obligatoire"> *</span>
                  </label>
                  <input
                    id="add-location"
                    name="location"
                    type="text"
                    maxLength="255"
                    required
                  />
                </p>
                <p>
                  <label htmlFor="add-sizes">Dimensions</label>
                  <input
                    id="add-sizes"
                    name="sizes"
                    type="text"
                    maxLength="255"
                  />
                </p>
              </fieldset>
              <fieldset>
                <legend>Compléments</legend>
                <p>
                  <label htmlFor="add-story">Anecdote</label>
                  <textarea id="add-story" name="story" />
                </p>
                <p>
                  <label htmlFor="add-external">Lien externe</label>
                  <input
                    id="add-external"
                    name="external"
                    type="url"
                    maxLength="255"
                  />
                </p>
              </fieldset>
              <fieldset>
                <legend>Publier l’œuvre&nbsp;?</legend>
                <ul>
                  <li>
                    <input
                      id="add-publish-yes"
                      name="is_published"
                      type="radio"
                      value="true"
                    />
                    <label htmlFor="add-publish-yes">Oui</label>
                  </li>
                  <li>
                    <input
                      id="add-publish-no"
                      name="is_published"
                      type="radio"
                      value="false"
                      defaultChecked
                    />
                    <label htmlFor="add-publish-no">Non</label>
                  </li>
                </ul>
              </fieldset>
              <p>
                <input type="submit" value="Ajouter" />
              </p>
            </form>
          </section>
        </>
      ) : (
        <Admin403 />
      )}
    </>
  );
}
