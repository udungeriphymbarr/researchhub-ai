import { useState } from "react";
import ArticleTable from "../../components/blog/ArticleTable";
import ArticleForm from "../../components/blog/ArticleForm";

function AdminArticles() {
  const [editingArticle, setEditingArticle] = useState(null);

  return (
    <div className="space-y-10">

      <ArticleTable
        setEditingArticle={setEditingArticle}
      />

      <ArticleForm
        editingArticle={editingArticle}
        setEditingArticle={setEditingArticle}
      />

    </div>
  );
}

export default AdminArticles;