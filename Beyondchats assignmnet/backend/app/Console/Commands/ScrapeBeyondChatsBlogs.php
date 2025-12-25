
<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use GuzzleHttp\Client;
use Symfony\Component\DomCrawler\Crawler;
use App\Models\Article;
use Illuminate\Support\Str;

class ScrapeBeyondChatsBlogs extends Command {
    protected $signature = 'scrape:beyondchats';
    protected $description = 'Scrape oldest BeyondChats blogs';

    public function handle() {
        $client = new Client();
        $html = $client->get('https://beyondchats.com/blogs/')->getBody();
        $crawler = new Crawler($html);

        $crawler->filter('article')->slice(-5)->each(function ($node) {
            $title = trim($node->filter('h2')->text());
            $slug = Str::slug($title);

            if (!Article::where('slug',$slug)->exists()) {
                Article::create([
                    'title'=>$title,
                    'slug'=>$slug,
                    'content'=>'Scraped placeholder content',
                    'source_url'=>'https://beyondchats.com/blogs/',
                    'is_generated'=>false
                ]);
            }
        });

        $this->info('Scraping completed');
    }
}
