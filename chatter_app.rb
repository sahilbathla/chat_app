require 'sinatra'
require 'sinatra/assetpack'
require_relative 'config.rb'

class ChatterApp < Sinatra::Base
  
  register Sinatra::AssetPack

  assets do
    serve '/js', from: 'assets/javascripts'
    serve '/css', from: 'assets/stylesheets'
  end

  post '/new_message' do
    Pusher.url = "http://bfc4c00a003c45623df2:b514db97fbd9b19bafb1@api.pusherapp.com/apps/101488"

    Pusher['chat'].trigger('new_message', {
      message: "Guest: #{ params[:chat] }"
    })
  end

  get '/' do
    send_file 'chat.html'
  end
end