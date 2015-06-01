# -*- coding: utf-8 -*-
#
# (c) 2013-2015 Wishtack
#
# $Id: $
#

from ..lib.djangular_test_case import DjangularTestCase
from app.models.user import User


class TestUserResource(DjangularTestCase):

    def setUp(self):
        self._reset()

        self._api_url_user_list = u"/api/v1/users/"
        self._api_url_user_detail = self._api_url_user_list + u"{user_id}/"
        self._api_url_user_wish_list = self._api_url_user_detail + u"wishes/"
        self._api_url_user_wish_detail = self._api_url_user_wish_list + u"{wish_id}/"

    def tearDown(self):
        self._reset()

    def _reset(self):
        User.drop_collection()

    def test_users(self):

        # Users list is empty.

        response = self.api_client().get(uri=self._api_url_user_list)
        self.assertHttpOK(response)

        data = self.deserialize(response)
        self.assertEqual([], data['objects'])

        # Create user.

        response = self.api_client().post(
            uri=self._api_url_user_list,
            data={
                'email': u"foo@bar.com",
                'firstName': u"Foo",
                'lastName': u"BAR"
            }
        )
        self.assertHttpCreated(response)

        data = self.deserialize(response)
        user_id = data['id']

        self.assertRegexpMatches(user_id, u"[a-f][0-9]+")
        self.assertEqual(u"foo@bar.com", data['email'])
        self.assertEqual(u"Foo", data['first_name'])
        self.assertEqual(u"BAR", data['last_name'])

        # Users list is not empty.

        response = self.api_client().get(uri=self._api_url_user_list)
        self.assertHttpOK(response)

        data = self.deserialize(response)
        self.assertEqual(1, len(data['objects']))
        self.assertEqual(u"foo@bar.com", data['objects'][0]['email'])

        # Delete user

        response = self.api_client().delete(uri=self._api_url_user_detail.format(user_id=user_id))
        self.assertHttpAccepted(response)

        # Users list is empty.

        response = self.api_client().get(uri=self._api_url_user_list)
        self.assertHttpOK(response)

        data = self.deserialize(response)
        self.assertEqual([], data['objects'])

    def test_users_wishes(self):

        # Create user.

        response = self.api_client().post(
            uri=self._api_url_user_list,
            data={
                'email': u"foo@bar.com",
                'firstName': u"Foo",
                'lastName': u"BAR"
            }
        )
        self.assertHttpCreated(response)

        data = self.deserialize(response)
        user_id = data['id']

        # Wishes list is empty.

        response = self.api_client().get(uri=self._api_url_user_wish_list.format(user_id=user_id))
        self.assertHttpOK(response)

        data = self.deserialize(response)
        self.assertEqual([], data['objects'])

        # Add wish.

        response = self.api_client().post(
            uri=self._api_url_user_wish_list.format(user_id=user_id),
            data={
                'price': {
                    'coefficient': 10000,
                    'exponent': -2,
                    'currency': u"USD",
                },
                'title': u"Holidays"
            }
        )
        self.assertHttpCreated(response)

        data = self.deserialize(response)
        wish_id = data['id']

        # Wish has been added.

        response = self.api_client().get(uri=self._api_url_user_wish_list.format(user_id=user_id))
        self.assertHttpOK(response)

        data = self.deserialize(response)
        self.assertEqual(1, len(data['objects']))

        wish = data['objects'][0]

        self.assertEqual({
            'coefficient': 10000,
            'currency': u"USD",
            'exponent': -2
        }, wish['price'])

        self.assertEqual(u"Holidays", wish['title'])

        # Updating & patching user resource should not affect wishes.

        self.api_client().patch(uri=self._api_url_user_detail.format(user_id=user_id), data={'first_name': u"test"})
        self.api_client().put(uri=self._api_url_user_detail.format(user_id=user_id), data={'first_name': u"test"})

        response = self.api_client().get(uri=self._api_url_user_wish_list.format(user_id=user_id))
        self.assertHttpOK(response)

        data = self.deserialize(response)
        self.assertEqual(1, len(data['objects']))


        # Delete wish.

        response = self.api_client().delete(uri=self._api_url_user_wish_detail.format(user_id=user_id, wish_id=wish_id))
        self.assertHttpAccepted(response)

        # Wishes list is empty.

        response = self.api_client().get(uri=self._api_url_user_wish_list.format(user_id=user_id))
        self.assertHttpOK(response)

        data = self.deserialize(response)
        self.assertEqual([], data['objects'])
