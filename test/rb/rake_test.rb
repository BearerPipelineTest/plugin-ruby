# frozen_string_literal: true

require "test_helper"
require "prettier/rake/task"

class RakeTest < Minitest::Test
  Invoke = Struct.new(:args)

  def test_task
    source_files = "{app,config,lib}/**/*.rb"
    Prettier::Rake::Task.new do |t|
      t.name = :format
      t.write = true
      t.source_files = source_files
    end

    invoke = nil
    Prettier.stub(:run, ->(args) { invoke = Invoke.new(args) }) do
      Rake::Task["format"].invoke
    end

    assert_equal ["--write", source_files], invoke.args
  end
end
