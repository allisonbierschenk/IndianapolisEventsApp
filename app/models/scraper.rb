require 'open-uri'
require 'nokogiri'
# require 'pry'

class Scraper
  
  def scrape_pagination
    url_collection = []
    page = 1

    while page <= 2
      
      url = "https://www.visitindy.com/indianapolis-things-to-do-events?page=#{page}"
      url_collection << url
      page +=1 
    end
    
    scrape_paginated_urls(url_collection)
  end
  
  def scrape_paginated_urls(url_collection)
    events_list = []
    
    url_collection.each do |event|
      doc = Nokogiri::HTML(URI.open(event))
      
      doc.css('div.list-grid-item').each do |node|
        if node.css('h3.blue-dark > a').text != ''
          
        title = node.css('h3.blue-dark > a').text
        url = 'https://www.visitindy.com' + node.css('h3.blue-dark > a/@href').text
        date = node.css('div.list-info').css('div:not(.mb-2)').text
        address = node.css('p:not(.blue-dark)').css('p.styled').text
        venue = node.css('p.gray-light').text
    
        event_info = {
          title: title,
          url: url, 
          date: date,
          address: address,
          venue: venue
        }
  
    events_list << event_info
        end
      end
    end
    events_list
    # binding.pry
  end

end


scrape = Scraper.new
scrape.scrape_pagination
