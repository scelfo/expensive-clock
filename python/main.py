#!/usr/bin/env python
#
# Copyright 2007 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
import os

from google.appengine.ext import webapp
from google.appengine.ext.webapp import util
from google.appengine.ext.webapp import template


js_version = 3


class MainHandler(webapp.RequestHandler):
    def get(self):
      template_values = {'js_version': js_version}
      path = os.path.join(os.path.dirname(__file__), '../html/index.html')
      self.response.out.write(template.render(path, template_values))


class ClockHandler(webapp.RequestHandler):
    def get(self, offset, length, size):
      template_values = {
        'offset': offset,
        'length': length,
        'size': size,
        'js_version': js_version,
      }
      path = os.path.join(os.path.dirname(__file__), '../html/clock.html')
      self.response.out.write(template.render(path, template_values))


def main():
    application = webapp.WSGIApplication([
        (r'^/([0-9])/([0-9])/([0-9]*)$', ClockHandler),
        (r'.*', MainHandler),
    ], debug=True)
    util.run_wsgi_app(application)


if __name__ == '__main__':
    main()
