
from django.conf.urls import patterns, include
from tastypie.api import Api

from .views.api.user_resource import UserResource

urlpatterns = []

#
# Api
#
api = Api(api_name=u"v1")
api.register(UserResource())
urlpatterns += patterns('', (r'^api/', include(api.urls)))
