Event.destroy_all

scrape = Scraper.new
events_list = scrape.scrape_pagination
Event.create_from_collection(events_list)