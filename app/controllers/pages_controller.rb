class PagesController < ApplicationController
  before_action :authenticate_user!, only: [:ranking]

  def index
  end

  def ranking
  end
end