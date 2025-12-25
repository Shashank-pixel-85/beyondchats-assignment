
<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller {

    public function index() {
        return Article::latest()->get();
    }

    public function latest() {
        return Article::latest()->first();
    }

    public function show($id) {
        return Article::findOrFail($id);
    }

    public function store(Request $request) {
        return Article::create($request->all());
    }

    public function update(Request $request, $id) {
        $article = Article::findOrFail($id);
        $article->update($request->all());
        return $article;
    }

    public function destroy($id) {
        Article::destroy($id);
        return response()->noContent();
    }
}
