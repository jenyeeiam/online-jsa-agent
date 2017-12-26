class HomeController < ApplicationController
  def index
    puts "doing stuff now"
    puts "#{ENV['JSA_KEY']}"
  end
end
